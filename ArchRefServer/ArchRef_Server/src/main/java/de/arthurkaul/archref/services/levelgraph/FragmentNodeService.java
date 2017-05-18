package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import de.arthurkaul.archref.model.levelgraph.FragmentNode;
import de.arthurkaul.archref.repositories.FragmentNodeRepository;

@Service
public class FragmentNodeService implements FragmentNodeInterface {

	@Autowired
	FragmentNodeRepository fragmentNodeRepository;

	@Override
	public Collection<FragmentNode> findAllFragmentNodes() {

		return fragmentNodeRepository.findAll();
	}

	@Override
	public FragmentNode findById(long id) {

		return fragmentNodeRepository.findOne(id);
	}

	@Override
	public FragmentNode create(FragmentNode fragmentNode) {
		if(fragmentNode.getId() != null){
			return null;
		}
		return fragmentNodeRepository.save(fragmentNode);
	}

	@Override
	public FragmentNode update(FragmentNode fragmentNode) {
		FragmentNode persistedFragmentNode = fragmentNodeRepository	.findOne(fragmentNode.getId());

		if (persistedFragmentNode == null) {
			return null;
		}
		return fragmentNodeRepository.save(fragmentNode);
	}

	@Override
	public void delete(long id) {
		fragmentNodeRepository.delete(id);

	}

	@Override
	public void deleteAllFragmentNodes() {
		fragmentNodeRepository.deleteAll();

	}

}
