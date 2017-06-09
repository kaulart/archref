package de.arthurkaul.archref.services.levelgraph;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import de.arthurkaul.archref.model.types.FragmentType;
import de.arthurkaul.archref.repositories.FragmentNodeRepository;

@Service
public class FragmentNodeService implements FragmentNodeInterface {

	@Autowired
	FragmentNodeRepository fragmentNodeRepository;

	@Override
	public Collection<FragmentType> findAllFragmentNodes() {

		return fragmentNodeRepository.findAll();
	}

	@Override
	public FragmentType findById(long id) {

		return fragmentNodeRepository.findOne(id);
	}

	@Override
	public FragmentType create(FragmentType fragmentNode) {
		if(fragmentNode.getId() != null){
			return null;
		}
		return fragmentNodeRepository.save(fragmentNode);
	}

	@Override
	public FragmentType update(FragmentType fragmentNode) {
		FragmentType persistedFragmentNode = fragmentNodeRepository	.findOne(fragmentNode.getId());

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
