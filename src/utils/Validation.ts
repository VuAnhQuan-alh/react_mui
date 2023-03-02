import {
  setLocale,
  mixed,
  array,
  date,
  number,
  object,
  string,
  type ValidationError,
  type AnySchema,
  type ObjectShape,
} from 'yup';
import Regex from './Regex';

class Validation {
  constructor() {
    setLocale({
      mixed: {
        required: 'schema.required',
      },
      string: {
        trim: 'schema.trim',
        max: 'schema.maxLength',
      },
    });
  }

  public mixed() {
    return mixed();
  }
  public array() {
    return array();
  }
  public resolver(error: ValidationError) {
    return error.message;
  }
  public validate(validate?: AnySchema) {
    return async (value: any) => {
      if (!validate) return false;

      const message = await validate
        .validate(value)
        .then(() => void 0)
        .catch(this.resolver);

      return message;
    };
  }
  public shape<T extends ObjectShape>(additions: T, excludes?: [string, string][]) {
    return object().shape<T>(additions, excludes);
  }
  public string() {
    return string().ensure().max(255).trim().default('');
  }
  public number() {
    return number();
  }
  public select(value: number) {
    return number().required().default(value);
  }
  public date() {
    return date().required().typeError('schema.invalidDate').nullable().default(null);
  }
  public email() {
    return string().required().matches(Regex.email, 'schema.validEmail').max(255).default('');
  }
  public phone() {
    return string().trim().required().matches(Regex.phone, 'schema.validPhone').max(255).default('');
  }
  public pattern(regexp: RegExp, massage?: string) {
    return this.string().matches(regexp, massage);
  }
}

export default new Validation();
