import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

// URL for XML Import
const URL_IMPORT = '/api/import';

// URL for XML Export
const URL_EXPORT = '/api/export';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})

/*****************************************************************************************************************************
 *
 * @component - AdministrationComponent - Lazy loaded component as wrapper for all other components in the AdministrationComponent
 *
 * @author - Arthur Kaul
 *
 ****************************************************************************************************************************/
export class AdministrationComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({});

  constructor() { };

  ngOnInit(): void {
    return;
  }

  importXml() {
    this.uploader.setOptions({ url: URL_IMPORT });
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    };
  }

  exportXml() {

  }
}
