'use strict';

import * as CursorEventDispatchService from './cursor-event-dispatch.service';
import * as EventSimulatorService from './event-simulator.service';
import * as RefConvertService from './ref-convert.service';
import * as SearchElementService from './search-element.service';

const EventDispatcher = {
CursorEventDispatchService: CursorEventDispatchService,
EventSimulatorService: EventSimulatorService,
RefConvertService: RefConvertService,
SearchElementService: SearchElementService,
};

export default EventDispatcher;