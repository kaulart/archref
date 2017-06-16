import { LevelGraph } from '../../../../shared/datamodels/levelgraph/levelgraph';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-levelgraphnode',
  templateUrl: './levelgraphnode.component.html',
  styleUrls: ['./levelgraphnode.component.css']
})
export class LevelGraphNodeComponent implements OnInit {

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
