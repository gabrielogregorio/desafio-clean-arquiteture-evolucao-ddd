export type NotificationErrorProps = {
  message: string;
  context: string;
};

export class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(error: NotificationErrorProps) {
    this.errors.push(error);
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  getErrors() {
    return this.errors;
  }

  messages(context?: string): string {
    return this.errors
      .filter((error) => {
        if (!context) {
          return true;
        }

        return error.context === context;
      })
      .map((error) => `${error.context}: ${error.message}`)
      .join(', ')
      .replace(/,\s*$/, '');
  }
}
