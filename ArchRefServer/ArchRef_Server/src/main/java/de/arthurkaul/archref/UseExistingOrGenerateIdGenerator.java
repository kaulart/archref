package de.arthurkaul.archref;

import java.io.Serializable;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SessionImplementor;
import org.hibernate.id.UUIDGenerator;;

/***********************************************************************************************************************************************************************************************************
 * 
 * @class UseExistingOrGenerateIdGenerator - ID Generator Class for global UUID. Generate Id if no id was set by creation and if exist at creation time no id will be generated
 * 
 * 
 * @author Arthur Kaul
 *
 **********************************************************************************************************************************************************************************************************/
public class UseExistingOrGenerateIdGenerator extends UUIDGenerator {
	@Override
	public Serializable generate(SessionImplementor session, Object object) throws HibernateException {
		Serializable id = session.getEntityPersister(null, object).getClassMetadata().getIdentifier(object, session);
		return id != null ? id : super.generate(session, object);
	}
}
