package de.arthurkaul.archref.model.levelgraph;

import java.util.Collection;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Inheritance(strategy=InheritanceType.JOINED)
@DiscriminatorColumn(name="LEVELGRAPHNODE_TYPE")
@Table(name="LEVELGRAPHNODE")
public class LevelGraphNode {

	@Id
	@GeneratedValue()
	@Column(name = "ID")
	private Long id;

	@Column(name = "X_POSITION")
	private Integer x;

	@Column(name = "Y_POSITION")
	private Integer y;

	@Column(name = "WIDTH")
	private Integer width;

	@Column(name = "HEIGHT")
	private Integer height;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="targetLevelGraphNode")
	@JsonManagedReference (value="levelgraphrelation-targetlevelgraphnodes")
	private Collection<LevelGraphRelation> inLevelGraphRelation;
	
	@OneToMany (cascade=CascadeType.ALL, fetch=FetchType.LAZY, mappedBy="sourceLevelGraphNode")
	@JsonManagedReference (value="levelgraphrelation-sourcelevelgraphnodes")
	private Collection<LevelGraphRelation> outLevelGraphRelation;
	
	@Column(name = "TYPE")
	private String levelGraphNodeType;
	
	@Column(name = "TYPEREF")
	private long typeRef;
	
	@Column(name = "Level_ID")
	private Long levelId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "LEVELGRAPH_ID")
	@JsonBackReference (value="levelgraph-levelgraphnodes")
	private LevelGraph levelGraph;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getY() {
		return y;
	}

	public void setY(Integer y) {
		this.y = y;
	}

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public Integer getX() {
		return x;
	}

	public void setX(Integer x) {
		this.x = x;
	}

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

	

}
