// one calendar row represents SLOT_MINUTES; a day column holds 24 hours of rows
export const SLOT_MINUTES = 15;
export const SLOTS_PER_DAY = (24 * 60) / SLOT_MINUTES

// dnd-kit library identifiers shared by draggables, droppables and drag end handler
export const ACTIVITY_BANK_ID = 'activityBank';
export const TIME_SLOT_DROP_TYPE = 'timeSlot';
export const ACTIVITY_DRAG_TYPE = 'activity';

// form intent handled by newTripPageAction
export const MOVE_ACTIVITY_INTENT = 'move activity';

