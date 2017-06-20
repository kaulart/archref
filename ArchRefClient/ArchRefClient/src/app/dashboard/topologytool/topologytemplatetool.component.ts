import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topologytemplatetool',
  templateUrl: './topologytemplatetool.component.html',
  styleUrls: ['./topologytemplatetool.component.css']
})

/****************************************************************************************************************************************
 *
 * @component - TopologyTemplateToolComponent - Lazy loaded component as wrapper for a better view result and for decoupling header 
 *                                              from the data panel
 *
 * @author - Arthur Kaul
 *
 ***************************************************************************************************************************************/
export class TopologyTemplateToolComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
