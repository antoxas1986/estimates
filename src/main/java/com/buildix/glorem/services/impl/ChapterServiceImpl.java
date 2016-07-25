package com.buildix.glorem.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.ChapterDao;
import com.buildix.glorem.models.Chapter;
import com.buildix.glorem.services.ChapterService;

@Service
@Transactional
public class ChapterServiceImpl implements ChapterService {
	
	@Autowired
	private ChapterDao chapterDao;
	
	@Override
	public Chapter getProjectByProjectId(Integer chapterId) {
		return chapterDao.getChapterByChapterId(chapterId);
	}

	@Override
	public List<Chapter> getAllChapters() {
		return chapterDao.getAllChapters();
	}

	@Override
	public void addChapter(Chapter chapter) {
		chapterDao.addChapter(chapter);
		
	}

	@Override
	public void deleteChapter(Integer id) {
		chapterDao.deleteChapter(id);
		
	}

	@Override
	public void updateChapter(Chapter chapter) {
		chapterDao.updateChapter(chapter);
		
	}

}
