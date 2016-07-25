package com.buildix.glorem.jdbc.dao;

import java.util.List;

import com.buildix.glorem.models.Chapter;

public interface ChapterDao {

	Chapter getChapterByChapterId(Integer chapterId);

	List<Chapter> getAllChapters();

	void addChapter(Chapter chapter);

	void deleteChapter(Integer id);

	void updateChapter(Chapter chapter);

}