import { LevelGraph } from '../../../../shared/datamodels/levelgraph/levelgraph';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-levelgraphrelation',
  templateUrl: './levelgraphrelation.component.html',
  styleUrls: ['./levelgraphrelation.component.css']
})
export class LevelGraphRelationComponent implements OnInit {

  @Input()
  currentLevelGraph: LevelGraph;

  constructor() { }
  /*********************************************************************************************************************************************
   *
   * @method ngOnInit is called when the component is initialized
   *
   ********************************************************************************************************************************************/
  ngOnInit() {
  }

}
