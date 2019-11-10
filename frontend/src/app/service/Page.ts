import { isArray } from "util";

interface Page {
  content: any[];
}

export class PageImpl implements Page {
  static of(content: any): Page {
    if (isArray(content)) {
      return new PageImpl(content);
    } else {
      return new PageImpl([content]);
    }
  }

  constructor(public content: any[]) {}
}
