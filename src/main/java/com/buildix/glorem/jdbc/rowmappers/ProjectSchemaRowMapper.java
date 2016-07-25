package com.buildix.glorem.jdbc.rowmappers;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.buildix.glorem.models.ProjectSchema;

/**
 * @author Antoxas
 *
 */
public class ProjectSchemaRowMapper implements RowMapper<ProjectSchema> {
		
	private static final int ID_FIELD = 1;
	private static final int PREP_FIELD = 2;
	private static final int RI_FIELD = 3;
	private static final int EL1_FIELD = 4;
	private static final int SP_FIELD = 5;
	private static final int INSP1 = 6;
	private static final int SF_FIELD = 7;
	private static final int FG_FIELD = 8;
	private static final int INSP2_FIELD = 9;
	private static final int DRY1 = 10;
	private static final int TILE_FIELD = 11;
	private static final int DF_FIELD = 12;
	private static final int PR_FIELD = 13;
	private static final int P1_FIELD = 14;
	private static final int DTB_FIELD = 15;
	private static final int CAB_FIELD = 16;
	private static final int P2_FIELD = 17;
	private static final int EL2_FIELD = 18;
	private static final int BAT_FIELD = 19;
	private static final int LVT_FIELD = 20;
	private static final int CT_FIELD = 21;
	private static final int FGLASS_FIELD = 22;
	private static final int P3_FIELD = 23;
	private static final int EL3_FIELD = 24;
	private static final int FIN_FIELD = 25;
	private static final int CAR_FIELD = 26;
	private static final int PTU_FIELD = 27;
	private static final int INSP3_FIELD = 28;
	private static final int AFTER_FIELD = 29;
	private static final int NAME_FIELD = 30;
	

	@Override
	public ProjectSchema mapRow(ResultSet rs, int rowNum) throws SQLException {
		ProjectSchema schema = new ProjectSchema();
		schema.setProjectSchemaId(rs.getInt(ID_FIELD));
		schema.setPREP(rs.getInt(PREP_FIELD));
		schema.setRI(rs.getInt(RI_FIELD));
		schema.setEL1(rs.getInt(EL1_FIELD));
		schema.setSP(rs.getInt(SP_FIELD));
		schema.setINSP1(rs.getInt(INSP1));
		schema.setSF(rs.getInt(SF_FIELD));
		schema.setFG(rs.getInt(FG_FIELD));
		schema.setINSP2(rs.getInt(INSP2_FIELD));
		schema.setDRY1(rs.getInt(DRY1));
		schema.setTILE(rs.getInt(TILE_FIELD));
		schema.setDF(rs.getInt(DF_FIELD));
		schema.setPR(rs.getInt(PR_FIELD));
		schema.setPA1(rs.getInt(P1_FIELD));
		schema.setDTB(rs.getInt(DTB_FIELD));
		schema.setCAB(rs.getInt(CAB_FIELD));
		schema.setPA2(rs.getInt(P2_FIELD));
		schema.setEL2(rs.getInt(EL2_FIELD));
		schema.setBAT(rs.getInt(BAT_FIELD));
		schema.setLVT(rs.getInt(LVT_FIELD));
		schema.setCT(rs.getInt(CT_FIELD));
		schema.setFGLASS(rs.getInt(FGLASS_FIELD));
		schema.setPA3(rs.getInt(P3_FIELD));
		schema.setEL3(rs.getInt(EL3_FIELD));
		schema.setFIN(rs.getInt(FIN_FIELD));
		schema.setCAR(rs.getInt(CAR_FIELD));
		schema.setPTU(rs.getInt(PTU_FIELD));
		schema.setINSP3(rs.getInt(INSP3_FIELD));
		schema.setAFTER(rs.getInt(AFTER_FIELD));
		schema.setSchemaName(rs.getString(NAME_FIELD));
		return schema;
	}

}
