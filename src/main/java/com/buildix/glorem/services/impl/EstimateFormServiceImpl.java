package com.buildix.glorem.services.impl;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.buildix.glorem.jdbc.dao.ChapterDao;
import com.buildix.glorem.jdbc.dao.SchemaFormDao;
import com.buildix.glorem.jdbc.dao.TypeJobDao;
import com.buildix.glorem.models.Chapter;
import com.buildix.glorem.models.EstimateForm;
import com.buildix.glorem.models.TypeJob;
import com.buildix.glorem.services.EstimateFormService;

@Service
@Transactional
public class EstimateFormServiceImpl implements EstimateFormService {

	@Autowired
	private ChapterDao chapterDao;
	@Autowired
	private TypeJobDao tjDao;
	@Autowired
	private SchemaFormDao sFormDao;

	@Override
	public List<EstimateForm> getForm() {
		List<EstimateForm> list = new ArrayList<EstimateForm>();
		List<Chapter> chapterList = chapterDao.getAllChapters();
		for (int i = 0; i < chapterList.size(); i++) {
			EstimateForm form = new EstimateForm();
			form.setChapterName(chapterList.get(i).getName());
			form.setTjList(tjDao.getTypeJobByChapterName(chapterList.get(i).getName()));
			list.add(form);
		}
		return list;
	}

	@Override
	public List<EstimateForm> getSchemaForm(String name) {
		List<EstimateForm> list = new ArrayList<EstimateForm>();
		List<Integer> nums = sFormDao.getSchemaFormByName(name).getIds();
		List<TypeJob> tjList = new ArrayList<TypeJob>();
		for (int i = 0; i < nums.size(); i++) {
			TypeJob tj = tjDao.getTypeJobById(nums.get(i));
			tjList.add(tj);
		}
		Set<String> names = new LinkedHashSet<String>();
		for (int j = 0; j < tjList.size(); j++) {
			names.add(tjList.get(j).getChapterName());
		}
		List<String> names2 = new ArrayList<String>(names);
		for (int t = 0; t < names2.size(); t++) {
			List<TypeJob> sorted = new ArrayList<TypeJob>();
			EstimateForm ef = new EstimateForm();
			for (int r = 0; r < tjList.size(); r++) {
				if (tjList.get(r).getChapterName().equals(names2.get(t))) {
					sorted.add(tjList.get(r));
				}
			}
			ef.setChapterName(names2.get(t));
			ef.setTjList(sorted);
			list.add(ef);
		}
		;
		return list;
	}

	@Override
	public void saveCustomerEstimate(List<EstimateForm> estimate) {
		for (int i = 0; i < estimate.size(); i++) {
			List<TypeJob> customreTypeJobs = estimate.get(i).getTjList();
			for (int j = 0; j < customreTypeJobs.size(); j++) {
				tjDao.addCustomerTypeJob(customreTypeJobs.get(j));
			}
		}
	}

	@Override
	public List<EstimateForm> getCustomerEstimate(Integer id) {
		List<EstimateForm> list = new ArrayList<EstimateForm>();
		List<TypeJob> tjList = tjDao.getTypeJobByCuctomerId(id);
		Set<String> names = new LinkedHashSet<String>();
		for (int j = 0; j < tjList.size(); j++) {
			names.add(tjList.get(j).getChapterName());
		}
		List<String> names2 = new ArrayList<String>(names);
		for (int t = 0; t < names2.size(); t++) {
			List<TypeJob> sorted = new ArrayList<TypeJob>();
			EstimateForm ef = new EstimateForm();
			Double count = 0.0;
			Double chapterCustTotal = 0.0; 
			for (int r = 0; r < tjList.size(); r++) {
				if (tjList.get(r).getChapterName().equals(names2.get(t))) {
					sorted.add(tjList.get(r));
					count = count+Double.parseDouble(tjList.get(r).getTotal());
					chapterCustTotal+= Double.parseDouble(tjList.get(r).getCustomerTotal());
				}
				
			}
			ef.setChapterName(names2.get(t));
			ef.setTjList(sorted);
			ef.setChapterCount(count);
			ef.setChapterCustTotal(chapterCustTotal);
			list.add(ef);
		}
		;
		return list;
	}

	@Override
	public void updateCustomerEstimate(List<EstimateForm> estimate) {
		for (int i = 0; i < estimate.size(); i++) {
			List<TypeJob> customreTypeJobs = estimate.get(i).getTjList();
			for (int j = 0; j < customreTypeJobs.size(); j++) {
				tjDao.updateCustomerTypeJob(customreTypeJobs.get(j));
			}
		}		
	}

}
