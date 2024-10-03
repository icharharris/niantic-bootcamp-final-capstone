package com.niantic.data;

import com.niantic.models.Brewer;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;


public class MySqlBrewerDao implements BrewerDao {
    private final JdbcTemplate jdbcTemplate;

    public MySqlBrewerDao(DataSource dataSource) {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }


    @Override
    public List<Brewer> getAll(int brewerId) {
        List<Brewer> brewers = new ArrayList<>();

        String sql = """
                SELECT brewer_id,
                    breweries_owned,
                    user_id
                FROM brewer;
                """;

        SqlRowSet row = jdbcTemplate.queryForRowSet(sql);

        while (row.next()) {
            int brewerId = row.getInt("brewer_id");
            int breweriesOwned = row.getInt("breweries_owned");
            int userId = row.getInt("user_id");

            Brewer brewer = new Brewer(brewerId, breweriesOwned, userId);

            brewers.add(brewer);
        }
        return brewers;
    }

    @Override
    public Brewer getBrewerById(int brewerId) {
        Brewer brewer = null;

        String sql = """
                SELECT brewer_id,
                    breweries_owned,
                    user_id
                FROM brewer
                WHERE brewer_id = ?;
                """;

        var row = jdbcTemplate.queryForRowSet(sql, brewerId );

        if (row.next())
        {
            int breweriesOwned = row.getInt("breweries_owned");
            int userId = row.getInt("user_id");

            brewer= new Brewer(brewerId, breweriesOwned, userId);

        }
        return brewer;
    }

    @Override
    public Brewer addBrewer(Brewer brewer) {
        String sql = """
                INSERT INTO Brewer
                (brewer_id,
                breweries_owned,
                user_id)
                VALUES (
                ?,?,?);
                """
    }

    @Override
    public void updateBrewer(int brewerId, Brewer brewer) {

    }

    @Override
    public void deleteBrewer(int brewerId) {

    }
}