package de.arthurkaul.archref.model.levelgraph;

import java.util.Collection;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import de.arthurkaul.archref.model.graph.Node;

@Entity
@Table(name = "LEVELGRAPHNODE")
public class LevelGraphNode extends Node{

	@Column(name = "LEVEL_ID")
	private Long levelId;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVEL")
	@JsonBackReference(value = "level-levelGraphNode")
	private Level level;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH")
	@JsonBackReference(value = "levelgraph-levelgraphnodes")
	private LevelGraph levelGraph;
	
	@Column(name = "LEVELGRAPH_ID")
	private Long levelGraphId;
	
	@OneToMany (fetch=FetchType.LAZY, mappedBy="targetLevelGraphNode")
    @Cascade(CascadeType.ALL)
	@JsonManagedReference (value="levelgraphrelation-targetlevelgraphnodes")
	private Collection<LevelGraphRelation> inLevelGraphRelation;

	@OneToMany (fetch = FetchType.EAGER, mappedBy = "sourceLevelGraphNode")
	@Cascade( CascadeType.ALL )
	@JsonManagedReference(value = "levelgraphrelation-sourcelevelgraphnodes")
	private Collection<LevelGraphRelation> outLevelGraphRelation;
	
	@Column(name = "TYPE")
	private String levelGraphNodeType;

	@Column(name = "TYPEREF")
	private long typeRef;
	
	public Collection<LevelGraphRelation> getInLevelGraphRelation() {
		return inLevelGraphRelation;
	}

	public void setInLevelGraphRelation(Collection<LevelGraphRelation> inLevelGraphRelation) {
		this.inLevelGraphRelation = inLevelGraphRelation;
	}

	public Collection<LevelGraphRelation> getOutLevelGraphRelation() {
		return outLevelGraphRelation;
	}

	public void setOutLevelGraphRelation(Collection<LevelGraphRelation> outLevelGraphRelation) {
		this.outLevelGraphRelation = outLevelGraphRelation;
	}

	public String getLevelGraphNodeType() {
		return levelGraphNodeType;
	}

	public void setLevelGraphNodeType(String levelGraphNodeType) {
		this.levelGraphNodeType = levelGraphNodeType;
	}

	public long getTypeRef() {
		return typeRef;
	}

	public void setTypeRef(long typeRef) {
		this.typeRef = typeRef;
	}

	public Long getLevelId() {
		return levelId;
	}

	public void setLevelId(Long levelId) {
		this.levelId = levelId;
	}

	public LevelGraph getLevelGraph() {
		return levelGraph;
	}

	public void setLevelGraph(LevelGraph levelGraph) {
		this.levelGraph = levelGraph;
	}

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}

}
