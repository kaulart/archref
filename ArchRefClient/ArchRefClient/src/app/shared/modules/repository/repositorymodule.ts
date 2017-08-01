import { RepositoryComponent } from './repository.component';
import { RepositoryDetailsModule } from './repositorydetails/repositorydetails.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';


@NgModule({
  imports: [
    FileUploadModule,
    FormsModule,
    CommonModule,
    RepositoryDetailsModule,
    RouterModule
  ],
  declarations: [RepositoryComponent],
  exports: [RepositoryComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module - RepositoryModule - Lazy loaded module as wrapper for all application modules and components which
 *                              should be accessible in the RepositoryModule, you can import this module in other
 *                              modules where you need to display the repository view for create, update, delete
 *                              or view repositories
 *
 * @author - Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class RepositoryModule {}
