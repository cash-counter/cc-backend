'use strict';

const UnimplementedException = require('../exceptions/unimplemented-exception');
const mongoose = require('mongoose');
const Rx = require('rxjs');

/**
 * Provides Mongoose basic operations based on a model.
 */
class CommonProvider {

  constructor(models) {
    this._models = models;
  }

  /**
   * This method must return the model name. If not implemented
   * by the class who is extending this class, it will throw an error
   * at development since it is impossible to run any method of this
   * class without implementing getModelName
   */
  getModelName() {
    throw new UnimplementedException('Not implemented');
  }

  /**
   * Creates a new record. All validations and restrictions at database
   * level are declared inside the corresponding model class, along with
   * its schema.
   * @param object
   * @returns Observable
   */
  insert(object) {
    return Rx.Observable.create(observer => {
      const entity = new this._models[this.getModelName()](object);
      entity.save((err, result) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next(result);
        }
        observer.complete();
      });
    })

  }

  /**
   * This checks the record id is a valid mongo ObjectId.
   * @param id to be validated
   * @returns {boolean} true if is valid
   */
  isIdValid(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  /**
   * Gets the record by id.
   * @param id that must be a valid ObjectId
   * @returns {*} null if id does not exist
   */
  getById(id) {
    return Rx.Observable.create(observer => {
      if (this.isIdValid(id)) {
        const filter = {
          '_id': id
        };
        this._models[this.getModelName()].findOne(filter, (err, results) => {
          if (err) {
            observer.error(err);
          } else {
            observer.next(results);
          }
          observer.complete();
        });
      } else {
        observer.next(null);
        observer.complete();
      }
    });
  }

}

module.exports = CommonProvider;
