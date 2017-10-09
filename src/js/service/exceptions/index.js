'use strict';

import ClassNotMatchException from './class-not-match-exception';
import NotImplementedException from './not-implemented-exception';
import NotInterestedException from './not-interested-event-exception';
import ObjectDuplicatedException from './object-duplicated-exception';

const Exceptions = {
  ClassNotMatchException: ClassNotMatchException,
  NotImplementedException: NotImplementedException,
  NotInterestedException: NotInterestedException,
  ObjectDuplicatedException: ObjectDuplicatedException,
}
export default Exceptions;