import { Injectable } from '@angular/core';

import * as alasql from 'alasql';

@Injectable()
export class ExcelService {

  constructor() { }

  public testAlaSQLExcelExport(json: any[]): void {

    console.log(json);
    alasql('SEARCH / AS @a \
      introduction AS @b \
      resources / AS @c \
      RETURN(@a->id AS id, @a->title AS title, @a->description AS description, \
        @a->keyTerms AS keyTerms, @a->visible AS visible, \
        @b->id as [introduction.id], @b->title as [introduction.title], \
        @c->id AS [introduction.resources.id], \
        @c->contentItem->id AS [introduction.resources.contentItem.id] \
      )\
    INTO XLS("porta_json.xls",{headers:true})\
    FROM ?', [json]);
  }

  /* generate a download */
  // private s2ab (s): any {
  //   const buf = new ArrayBuffer(s.length);
  //   const view = new Uint8Array(buf);
  //   for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
  //   return buf;
  // }



  // public exportAsExcelFile(json: any[], excelFileName: string): void {
  //   console.log(json);
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'binary' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([this.s2ab(buffer)], {
  //     type: EXCEL_TYPE
  //   });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }

}
