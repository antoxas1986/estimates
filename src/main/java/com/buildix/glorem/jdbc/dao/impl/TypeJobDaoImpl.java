package com.buildix.glorem.jdbc.dao.impl;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.buildix.glorem.jdbc.dao.TypeJobDao;
import com.buildix.glorem.jdbc.rowmappers.ChapterRowMapper;
import com.buildix.glorem.jdbc.rowmappers.TypeJobRowMapper;
import com.buildix.glorem.models.Chapter;
import com.buildix.glorem.models.TypeJob;

@Component
public class TypeJobDaoImpl implements TypeJobDao {
	
	private JdbcTemplate jdbcTemplate;
	private static final String SELECT_TYPEJOB_BY_ID = "select t.id, c.name, t.workDescription, t.price, t.unitName, t.minimumCharge, t.amount, t.total, t.customerId, t.customerAmount, t.customerTotal from typeJob as t inner join chapter as c on t.chapterId = c.id where t.id = ? ";
	private static final String DELETE_FROM_SCHEMA = "delete from schemaForm where id=?";
	private static final String ADD_TYPE_JOB = "INSERT INTO `typeJob`(`chapterId`,`workDescription`,`price`,`unitName`,`minimumCharge`)VALUES(?,?,?,?,?);";
	private static final String GET_ALL_TYPEJOB = "select t.id, c.name, t.workDescription, t.price, t.unitName, t.minimumCharge, t.amount, t.total, t.customerId, t.customerAmount, t.customerTotal from typeJob as t inner join chapter as c on t.chapterId = c.id";
	private static final String REMOVE_ITEM = "delete from typeJob where id=?";
	private static final String GET_TYPEJOB_BY_CHAPTER_NAME = "select t.id, c.name, t.workDescription, t.price, t.unitName, t.minimumCharge, t.amount, t.total,t.customerId, t.customerAmount,t.customerTotal from typeJob as t inner join chapter as c on t.chapterId=c.id where c.name = ?";
	private static final String ADD_CUSTOMER_TYPE_JOB = "INSERT INTO `customerTypeJob`(`chapterId`,`workDescription`,`price`,`unitName`,`minimumCharge`,amount,total,customerId,customerAmount,customerTotal)VALUES(?,?,?,?,?,?,?,?,?,?);";
	private static final String GET_TYPEJOB_BY_CUSTOMERID = "select t.id, c.name, t.workDescription, t.price, t.unitName, t.minimumCharge, t.amount, t.total, t.customerId,t.customerAmount,t.customerTotal from customerTypeJob as t inner join chapter as c on t.chapterId=c.id where t.customerId = ?";
	private static final String UPDATE_CUSTOMER_TYPE_JOB = "update customerTypeJob set chapterId=?,workDescription=?,price=?,unitName=?,minimumCharge=?,amount=?,total=?,customerId=?, customerAmount=?,customerTotal=? where id=?;";
	private static final String GET_CHAPTER_BY_NAME = "select * from chapter where name = ?";
	
	/**
	 * Sets the JdbcTemplate using the provided dataSource.
	 * 
	 * @param dataSource
	 */
	@Autowired
	public void setJdbcTemplate(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}

	@Override
	public void addTypeJob(TypeJob tj) {
		String chapterName = tj.getChapterName();
		Chapter chap = jdbcTemplate.queryForObject(GET_CHAPTER_BY_NAME, new Object[] { chapterName }, new ChapterRowMapper());
		jdbcTemplate.update(ADD_TYPE_JOB, chap.getId(), tj.getWorkDescription(), tj.getPrice(), tj.getUnitName(),
				tj.getMinimumCharge());
	}

	@Override
	public List<TypeJob> getAll() {
		return jdbcTemplate.query(GET_ALL_TYPEJOB, new Object[] {}, new TypeJobRowMapper());
	}

	@Override
	public void removeItem(Integer itemId) {
		jdbcTemplate.update(DELETE_FROM_SCHEMA, itemId);
		jdbcTemplate.update(REMOVE_ITEM, itemId);

	}

	@Override
	public List<TypeJob> getTypeJobByChapterName(String name) {
		return jdbcTemplate.query(GET_TYPEJOB_BY_CHAPTER_NAME, new Object[] { name }, new TypeJobRowMapper());
	}

	@Override
	public TypeJob getTypeJobById(Integer id) {
		return jdbcTemplate.queryForObject(SELECT_TYPEJOB_BY_ID, new Object[] { id }, new TypeJobRowMapper());
	}

	@Override
	public void addCustomerTypeJob(TypeJob typeJob) {
		String chapterName = typeJob.getChapterName();
		Chapter chap = jdbcTemplate.queryForObject(GET_CHAPTER_BY_NAME, new Object[] { chapterName }, new ChapterRowMapper());
		jdbcTemplate.update(ADD_CUSTOMER_TYPE_JOB, chap.getId(), typeJob.getWorkDescription(),
				typeJob.getPrice(), typeJob.getUnitName(), typeJob.getMinimumCharge(), typeJob.getAmount(),
				typeJob.getTotal(),typeJob.getCustomerId(), typeJob.getCustomerAmount(),typeJob.getCustomerTotal());
	}

	@Override
	public List<TypeJob> getTypeJobByCuctomerId(Integer id) {
		return jdbcTemplate.query(GET_TYPEJOB_BY_CUSTOMERID, new Object[]{id},new TypeJobRowMapper());
	}

	@Override
	public void updateCustomerTypeJob(TypeJob typeJob) {
		String chapterName = typeJob.getChapterName();
		Chapter chap = jdbcTemplate.queryForObject(GET_CHAPTER_BY_NAME, new Object[] { chapterName }, new ChapterRowMapper());
		jdbcTemplate.update(UPDATE_CUSTOMER_TYPE_JOB, chap.getId(), typeJob.getWorkDescription(),
				typeJob.getPrice(), typeJob.getUnitName(), typeJob.getMinimumCharge(), typeJob.getAmount(),
				typeJob.getTotal(), typeJob.getCustomerId(),typeJob.getCustomerAmount(),typeJob.getCustomerTotal(),typeJob.getId());		
	}

}
