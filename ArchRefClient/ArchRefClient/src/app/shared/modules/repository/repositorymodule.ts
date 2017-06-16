import { RepositoryComponent } from './repository.component';
import { RepositoryDetailsModule } from './repositorydetails/repositorydetails.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RepositoryDetailsModule,
    RouterModule
  ],
  declarations: [RepositoryComponent],
  exports: [RepositoryComponent]
})

/*******************************************************************************************************************
 *
 * @module RepositoryModule - Lazy loaded module as wrapper for all application modules and components which
 *                            should be accessible in the RepositoryModule
 *
 * @author Arthur Kaul
 *
 ******************************************************************************************************************/
export class RepositoryModule {}
