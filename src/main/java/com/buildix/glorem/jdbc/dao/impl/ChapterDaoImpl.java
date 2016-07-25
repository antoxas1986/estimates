package com.buildix.glorem.jdbc.dao.impl;

import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import com.buildix.glorem.jdbc.dao.ChapterDao;
import com.buildix.glorem.jdbc.dao.TypeJobDao;
import com.buildix.glorem.jdbc.rowmappers.ChapterRowMapper;
import com.buildix.glorem.models.Chapter;
import com.buildix.glorem.models.TypeJob;

@Component
public class ChapterDaoImpl implements ChapterDao  {

	private JdbcTemplate jdbcTemplate;
	private static final String GET_ALL_CHAPTER = "select c.id, c.name from chapter as c order by id";
	private static final String GET_CHAPTER_BY_CHAPTER_ID_QUERY = "select c.id, c.name from chapter as c where c.id = ? ";
	private static final String NEW_CHAPTER = "insert into chapter (name)value(?)";
	private static final String DELETE_CHAPTER = "delete from chapter where id = ?";
	private static final String UPDATE_CHAPTER = "update chapter set name = ? where id = ?";
	

	/**
	 * Sets the JdbcTemplate using the provided dataSource.
	 * 
	 * @param dataSource
	 */
	@Autowired
	public void setJdbcTemplate(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	@Autowired
	private TypeJobDao tjDao;

	
	@Override
	public Chapter getChapterByChapterId(Integer chapterId) {
		Chapter chapter = jdbcTemplate.queryForObject(GET_CHAPTER_BY_CHAPTER_ID_QUERY, new Object[] { chapterId },
				new ChapterRowMapper());
		return chapter;
	}

	
	@Override
	public List<Chapter> getAllChapters() {
		return jdbcTemplate.query(GET_ALL_CHAPTER, new Object[] {}, new ChapterRowMapper());
	}


	@Override
	public void addChapter(Chapter chapter) {
		jdbcTemplate.update(NEW_CHAPTER,chapter.getName());
		
	}


	@Override
	public void deleteChapter(Integer id) {
		//List<TypeJob> list = tjDao.getTypeJobByChapterName(name)
		jdbcTemplate.update(DELETE_CHAPTER, id);
		
	}


	@Override
	public void updateChapter(Chapter chapter) {
		jdbcTemplate.update(UPDATE_CHAPTER,chapter.getName(),chapter.getId());
		
	}

	

}
