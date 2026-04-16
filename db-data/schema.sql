-- ============================================================
-- BGG Board Game Database - PostgreSQL Schema for Supabase
-- ============================================================
-- Tables:
--   games                 — core game records
--   mechanics             — mechanic lookup
--   game_mechanics        — game ↔ mechanic (many-to-many)
--   themes                — theme lookup
--   game_themes           — game ↔ theme (many-to-many)
--   subcategories         — subcategory lookup
--   game_subcategories    — game ↔ subcategory (many-to-many)
--   artists               — artist lookup
--   game_artists          — game ↔ artist (many-to-many)
--   designers             — designer lookup
--   game_designers        — game ↔ designer (many-to-many)
--   publishers            — publisher lookup
--   game_publishers       — game ↔ publisher (many-to-many)
--   user_ratings          — individual user ratings per game
--   ratings_distribution  — count of ratings per value per game
-- ============================================================


-- ------------------------------------------------------------
-- Core game table  (sourced from games.csv)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS games (
    bgg_id                  INTEGER      PRIMARY KEY,
    name                    TEXT         NOT NULL,
    description             TEXT,
    year_published          INTEGER,
    game_weight             NUMERIC(6,4),
    avg_rating              NUMERIC(8,5),
    bayes_avg_rating        NUMERIC(8,5),
    std_dev                 NUMERIC(8,5),
    min_players             INTEGER,
    max_players             INTEGER,
    com_age_rec             NUMERIC(8,4),
    language_ease           NUMERIC(8,4),
    best_players            INTEGER,
    -- Stored as a JSON array string, e.g. "['2','3','4']"
    good_players            TEXT,
    num_owned               INTEGER,
    num_want                INTEGER,
    num_wish                INTEGER,
    num_weight_votes        INTEGER,
    mfg_playtime            INTEGER,
    com_min_playtime        INTEGER,
    com_max_playtime        INTEGER,
    mfg_age_rec             INTEGER,
    num_user_ratings        INTEGER,
    num_comments            INTEGER,
    num_alternates          INTEGER,
    num_expansions          INTEGER,
    num_implementations     INTEGER,
    is_reimplementation     BOOLEAN,
    family                  TEXT,
    kickstarted             BOOLEAN,
    image_path              TEXT,
    -- Rank columns: NULL means unranked in that category.
    -- The source CSV uses a large placeholder value (21926) for "not ranked";
    -- the import script converts those to NULL.
    rank_boardgame          INTEGER,
    rank_strategy_games     INTEGER,
    rank_abstracts          INTEGER,
    rank_family_games       INTEGER,
    rank_thematic           INTEGER,
    rank_cgs                INTEGER,
    rank_war_games          INTEGER,
    rank_party_games        INTEGER,
    rank_childrens_games    INTEGER,
    -- Broad category flags (Cat:* columns in games.csv)
    cat_thematic            BOOLEAN,
    cat_strategy            BOOLEAN,
    cat_war                 BOOLEAN,
    cat_family              BOOLEAN,
    cat_cgs                 BOOLEAN,
    cat_abstract            BOOLEAN,
    cat_party               BOOLEAN,
    cat_childrens           BOOLEAN,
    -- Low-experience credit flags from the *_reduced CSV files
    has_low_exp_artist      BOOLEAN      DEFAULT FALSE,
    has_low_exp_designer    BOOLEAN      DEFAULT FALSE,
    has_low_exp_publisher   BOOLEAN      DEFAULT FALSE
);


-- ------------------------------------------------------------
-- Mechanics  (sourced from mechanics.csv)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mechanics (
    id   SERIAL PRIMARY KEY,
    name TEXT   NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS game_mechanics (
    game_id     INTEGER NOT NULL REFERENCES games(bgg_id)    ON DELETE CASCADE,
    mechanic_id INTEGER NOT NULL REFERENCES mechanics(id)    ON DELETE CASCADE,
    PRIMARY KEY (game_id, mechanic_id)
);


-- ------------------------------------------------------------
-- Themes  (sourced from themes.csv)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS themes (
    id   SERIAL PRIMARY KEY,
    name TEXT   NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS game_themes (
    game_id  INTEGER NOT NULL REFERENCES games(bgg_id) ON DELETE CASCADE,
    theme_id INTEGER NOT NULL REFERENCES themes(id)   ON DELETE CASCADE,
    PRIMARY KEY (game_id, theme_id)
);


-- ------------------------------------------------------------
-- Subcategories  (sourced from subcategories.csv)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS subcategories (
    id   SERIAL PRIMARY KEY,
    name TEXT   NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS game_subcategories (
    game_id        INTEGER NOT NULL REFERENCES games(bgg_id)       ON DELETE CASCADE,
    subcategory_id INTEGER NOT NULL REFERENCES subcategories(id)   ON DELETE CASCADE,
    PRIMARY KEY (game_id, subcategory_id)
);


-- ------------------------------------------------------------
-- Artists  (sourced from artists_reduced.csv)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS artists (
    id   SERIAL PRIMARY KEY,
    name TEXT   NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS game_artists (
    game_id   INTEGER NOT NULL REFERENCES games(bgg_id)  ON DELETE CASCADE,
    artist_id INTEGER NOT NULL REFERENCES artists(id)    ON DELETE CASCADE,
    PRIMARY KEY (game_id, artist_id)
);


-- ------------------------------------------------------------
-- Designers  (sourced from designers_reduced.csv)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS designers (
    id   SERIAL PRIMARY KEY,
    name TEXT   NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS game_designers (
    game_id     INTEGER NOT NULL REFERENCES games(bgg_id)   ON DELETE CASCADE,
    designer_id INTEGER NOT NULL REFERENCES designers(id)   ON DELETE CASCADE,
    PRIMARY KEY (game_id, designer_id)
);


-- ------------------------------------------------------------
-- Publishers  (sourced from publishers_reduced.csv)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS publishers (
    id   SERIAL PRIMARY KEY,
    name TEXT   NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS game_publishers (
    game_id      INTEGER NOT NULL REFERENCES games(bgg_id)    ON DELETE CASCADE,
    publisher_id INTEGER NOT NULL REFERENCES publishers(id)   ON DELETE CASCADE,
    PRIMARY KEY (game_id, publisher_id)
);


-- ------------------------------------------------------------
-- User ratings  (sourced from user_ratings.csv)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_ratings (
    id       BIGSERIAL    PRIMARY KEY,
    game_id  INTEGER      NOT NULL REFERENCES games(bgg_id) ON DELETE CASCADE,
    username TEXT         NOT NULL,
    rating   NUMERIC(4,1) NOT NULL CHECK (rating >= 0 AND rating <= 10),
    UNIQUE (game_id, username)
);


-- ------------------------------------------------------------
-- Ratings distribution  (sourced from ratings_distribution.csv)
-- Wide CSV (one column per rating value) normalised to long format.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS ratings_distribution (
    game_id      INTEGER      NOT NULL REFERENCES games(bgg_id) ON DELETE CASCADE,
    rating_value NUMERIC(3,1) NOT NULL CHECK (rating_value >= 0 AND rating_value <= 10),
    count        INTEGER      NOT NULL DEFAULT 0,
    PRIMARY KEY (game_id, rating_value)
);


-- ============================================================
-- Indexes
-- ============================================================

-- games — common sort / filter columns
CREATE INDEX IF NOT EXISTS idx_games_avg_rating        ON games (avg_rating        DESC);
CREATE INDEX IF NOT EXISTS idx_games_bayes_avg_rating  ON games (bayes_avg_rating  DESC);
CREATE INDEX IF NOT EXISTS idx_games_year_published    ON games (year_published);
CREATE INDEX IF NOT EXISTS idx_games_rank_boardgame    ON games (rank_boardgame)    WHERE rank_boardgame IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_games_game_weight       ON games (game_weight);
CREATE INDEX IF NOT EXISTS idx_games_min_players       ON games (min_players);
CREATE INDEX IF NOT EXISTS idx_games_max_players       ON games (max_players);

-- junction tables — look up by the non-FK side
CREATE INDEX IF NOT EXISTS idx_game_mechanics_mechanic    ON game_mechanics    (mechanic_id);
CREATE INDEX IF NOT EXISTS idx_game_themes_theme          ON game_themes       (theme_id);
CREATE INDEX IF NOT EXISTS idx_game_subcategories_sub     ON game_subcategories (subcategory_id);
CREATE INDEX IF NOT EXISTS idx_game_artists_artist        ON game_artists      (artist_id);
CREATE INDEX IF NOT EXISTS idx_game_designers_designer    ON game_designers    (designer_id);
CREATE INDEX IF NOT EXISTS idx_game_publishers_publisher  ON game_publishers   (publisher_id);

-- user_ratings
CREATE INDEX IF NOT EXISTS idx_user_ratings_game_id  ON user_ratings (game_id);
CREATE INDEX IF NOT EXISTS idx_user_ratings_username  ON user_ratings (username);
CREATE INDEX IF NOT EXISTS idx_user_ratings_rating    ON user_ratings (rating);
