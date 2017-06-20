import { ExpectedPropertyComponent } from './expectedproperty/expectedproperty.component';
import { ProvidedPropertyComponent } from './providedproperty/providedproperty.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  declarations: [ExpectedPropertyComponent, ProvidedPropertyComponent],
  exports: [ExpectedPropertyComponent, ProvidedPropertyComponent]
})

/**********************************************************************************************************************************************************************************************************
 *
 * @module PropertyModule - SharedModule as wrapper for ExpectedProperties and ProvidedProperties import the module when you need access to the properties
 *
 * @author Arthur Kaul
 *
 *********************************************************************************************************************************************************************************************************/
export class PropertyModule { }
