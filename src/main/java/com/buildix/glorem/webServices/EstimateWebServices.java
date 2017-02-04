package com.buildix.glorem.webServices;

import com.buildix.glorem.models.*;
import com.buildix.glorem.services.*;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author Antoxas
 */
@RestController
public class EstimateWebServices {

    private static final String ROLE_ADMIN = "ROLE_ADMIN";
    private final Logger logger = Logger.getLogger(EstimateFormService.class);

    @Autowired
    ChapterService chapterService;
    @Autowired
    UnitService unitService;
    @Autowired
    TypeJobService tjService;
    @Autowired
    EstimateFormService estimateFormService;
    @Autowired
    SchemaFormService sfService;

    /**
     * @return
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/chapters", method = RequestMethod.GET)
    public List<Chapter> getChaptersList() {
        return chapterService.getAllChapters();
    }

    /**
     * @return
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/chapters/{id}", method = RequestMethod.GET)
    public void deletechapter(@PathVariable Integer id) {
        chapterService.deleteChapter(id);
    }

    /**
     * @return
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/chapters/{id}", method = RequestMethod.POST)
    public void updateChapter(@RequestBody Chapter chapter) {
        chapterService.updateChapter(chapter);
    }

    /**
     * @return
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/units", method = RequestMethod.GET)
    public List<Unit> getUnitsList() {
        return unitService.getAllUnits();
    }

    /**
     * @param tj
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/newChapters", method = RequestMethod.POST)
    public void newChaptersList(@RequestBody List<Chapter> tj) {
        for (int i = 0; i < tj.size(); i++) {
            chapterService.addChapter(tj.get(i));
        }
    }

    /**
     * @param tj
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/chapters", method = RequestMethod.POST)
    public void postChaptersList(@RequestBody List<TypeJob> tj) {
        for (int i = 0; i < tj.size(); i++) {
            tjService.addTypeJob(tj.get(i));
        }
    }

    /**
     * @return
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/items", method = RequestMethod.GET)
    public List<TypeJob> getItems() {
        return tjService.getAll();
    }

    /**
     * @param itemId
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/item/{itemId}", method = RequestMethod.DELETE)
    public void deleteItem(@PathVariable("itemId") Integer itemId) {
        tjService.removeItem(itemId);
    }

    /**
     * @return
     */
    @RequestMapping(value = "/getestimate", method = RequestMethod.GET)
    public List<EstimateForm> getEstimateForm() {
        return estimateFormService.getForm();
    }

    /**
     * @param schemaForm
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/saveForm", method = RequestMethod.POST)
    public void saveSchemaForm(@RequestBody SchemaForm schemaForm) {
        sfService.saveSchemaForm(schemaForm);
    }

    /**
     * @return
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/getSchemaNames", method = RequestMethod.GET)
    public List<String> getSchemaNames() {
        return sfService.getSchemaFormNames();
    }

    /**
     * @param name
     * @return
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/getEstimateForm/{name}", method = RequestMethod.GET)
    public List<EstimateForm> getEstimateForm(@PathVariable("name") String name) {
        return estimateFormService.getSchemaForm(name);
    }

    /**
     * @param estimate
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/saveCustomerEstimate", method = RequestMethod.POST)
    public void saveCustomerEstimate(@RequestBody List<EstimateForm> estimate) {
        estimateFormService.saveCustomerEstimate(estimate);
    }

    /**
     * @param id
     * @return
     */
    //@Secured(ROLE_ADMIN)
    @RequestMapping(value = "/showEstimate/{id}", method = RequestMethod.GET)
    public List<EstimateForm> showCustomerEstimate(@PathVariable("id") Integer id) {
        logger.info("Pulling customer estimate " + id);
        return estimateFormService.getCustomerEstimate(id);
    }

    /**
     * @param estimate
     */
    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/updateCustomerEstimate", method = RequestMethod.POST)
    public void updateCustomerEstimate(@RequestBody List<EstimateForm> estimate) {
        estimateFormService.updateCustomerEstimate(estimate);
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/updateItem", method = RequestMethod.PUT)
    public void updateCustomerEstimate(@RequestBody TypeJob item) {
        tjService.updateItem(item);
    }


    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/templateName", method = RequestMethod.PUT)
    public void updateTemplateName(@RequestBody String[] names) {
        sfService.updateTemplateName(names);
    }

    @Secured(ROLE_ADMIN)
    @RequestMapping(value = "/templateName/{name}", method = RequestMethod.DELETE)
    public void deleteTemplate(@PathVariable("name") String name) {
        sfService.deleteTemplate(name);
    }

}
