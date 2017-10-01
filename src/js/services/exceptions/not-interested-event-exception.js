export default class NotInterestedEventException extends Error {
  constructor(message, eventType) {
    super(message);
    this.eventType = eventType;
  }

  getEventType = () => (eventType)
}