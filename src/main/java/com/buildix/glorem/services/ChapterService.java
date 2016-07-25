package com.buildix.glorem.services;

import java.util.List;

import com.buildix.glorem.models.Chapter;

public interface ChapterService {

	Chapter getProjectByProjectId(Integer chapterId);

	List<Chapter> getAllChapters();

	void addChapter(Chapter chapter);

	void deleteChapter(Integer id);

	void updateChapter(Chapter chapter);

}