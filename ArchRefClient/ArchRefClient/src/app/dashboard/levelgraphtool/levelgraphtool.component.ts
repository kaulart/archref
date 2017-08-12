import {Logger} from '../../../logger/logger';
import {LevelGraph} from '../../shared/datamodels/levelgraph/levelgraph';
import {LevelGraphService} from '../../shared/dataservices/levelgraph/levelgraph.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-levelgraphtool',
  templateUrl: './levelgraphtool.component.html',
  styleUrls: ['./levelgraphtool.component.css']
})

/*******************************************************************************************************************
 *
 * @component - LevelGraphToolComponent as wrapper component for the LevelGraphComponent so that you can extend the
 *              tool component flexible with other components
 *
 * @author - Arthur Kaul
 *
 ******************************************************************************************************************/
export class LevelGraphToolComponent implements OnInit {

  levelGraphs: LevelGraph[] = [];

  constructor(
    private levelGraphService: LevelGraphService,
  ) {};

  ngOnInit() {
    this.retrieveLevelGraphs();
  }

  /********************************************************************************************************************************************************************************************************
  *
  * @method - retrieveLevelGraphs - Call the LevelGraphService for loading all LevelGraphs from database into the application and subscribe
  *                                 for a callback. Currently no pagination/streaming of data is supported
  *
  *******************************************************************************************************************************************************************************************************/
  retrieveLevelGraphs() {
    Logger.info('Retrieve LevelGraph Data', LevelGraphToolComponent.name);
    this.levelGraphService.getLevelGraphs()
      .subscribe(levelGraphsResponse => {
        this.levelGraphs = levelGraphsResponse;
        Logger.info('Level Graphs sucessfully retrieved.', LevelGraphToolComponent.name);
      });
  }
}
