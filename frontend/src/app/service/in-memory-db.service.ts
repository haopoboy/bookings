import { Injectable } from "@angular/core";
import {
  InMemoryDbService,
  RequestInfo,
  ResponseOptions
} from "angular-in-memory-web-api";
import { PageImpl } from "./Page";
import { UtilService } from "./util.service";

@Injectable({
  providedIn: "root"
})
export class InMemoryDbServiceImpl implements InMemoryDbService {
  constructor() {}

  createDb() {
    const people = this.autoGenerateIds([{ name: "Admin" }]);
    const resources = this.autoGenerateIds([{ name: "Bed room", cpacity: 3 }]);
    return { people, resources };
  }

  responseInterceptor(response: ResponseOptions, requestInfo: RequestInfo) {
    if ("post" === requestInfo.method) {
      // Fix undefine body from request when updated data
      response.body = response.body
        ? response.body
        : (requestInfo.req as any).body;
      return response;
    } else if (requestInfo.id) {
      return response;
    } else {
      // United pageable from server
      const page = PageImpl.of(response.body);
      response.body = page;
      return response;
    }
  }

  autoGenerateIds(list: any[]) {
    list.forEach((element, index) => {
      element.id = index + 1;
    });
    return list;
  }
}
