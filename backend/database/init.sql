CREATE TABLE work_types (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    description TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_work_types_name UNIQUE (name),
    CONSTRAINT chk_work_types_name_not_blank CHECK (BTRIM(name) <> '')
);

CREATE TABLE work_logs (
    id BIGSERIAL PRIMARY KEY,
    work_date DATE NOT NULL,
    work_type_id BIGINT NOT NULL,
    employee_name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    hours_spent NUMERIC(5, 2) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_work_logs_work_type
        FOREIGN KEY (work_type_id)
        REFERENCES work_types(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT chk_work_logs_employee_name_not_blank CHECK (BTRIM(employee_name) <> ''),
    CONSTRAINT chk_work_logs_description_not_blank CHECK (BTRIM(description) <> ''),
    CONSTRAINT chk_work_logs_hours_spent_positive CHECK (hours_spent > 0),
    CONSTRAINT chk_work_logs_hours_spent_max CHECK (hours_spent <= 24)
);

CREATE INDEX idx_work_logs_work_date
    ON work_logs (work_date);

CREATE INDEX idx_work_logs_work_type_id
    ON work_logs (work_type_id);

CREATE INDEX idx_work_logs_work_date_work_type_id
    ON work_logs (work_date, work_type_id);

CREATE INDEX idx_work_types_is_active
    ON work_types (is_active);

INSERT INTO work_types (name, description)
VALUES
    ('Монтаж', 'Монтажные и сборочные работы'),
    ('Земляные работы', 'Подготовка основания, разработка грунта'),
    ('Отделочные работы', 'Внутренняя и внешняя отделка'),
    ('Доставка материалов', 'Приемка и перемещение строительных материалов');

INSERT INTO work_logs (work_date, work_type_id, employee_name, description, hours_spent)
VALUES
    ('2026-06-01', 1, 'Иванов Иван', 'Монтаж перегородок на первом этаже', 8.00),
    ('2026-06-01', 2, 'Петров Петр', 'Подготовка траншеи под коммуникации', 6.50),
    ('2026-06-02', 3, 'Сидоров Алексей', 'Штукатурка стен в помещении 204', 7.25),
    ('2026-06-03', 4, 'Кузнецов Дмитрий', 'Приемка партии цемента и кирпича', 4.00),
    ('2026-06-03', 1, 'Иванов Иван', 'Установка металлических направляющих', 5.50);
