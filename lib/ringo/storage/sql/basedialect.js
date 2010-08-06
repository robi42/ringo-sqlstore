export("BaseDialect");

function BaseDialect() {
    var typeNameMap = {};
    var jdbcTypeNumberMap = {};

    Object.defineProperty(this, "openQuote", {"value": '"'});
    Object.defineProperty(this, "closeQuote", {"value": '"'});

    this.registerDataType = function(typeName, dataType) {
        typeNameMap[typeName] = dataType;
        jdbcTypeNumberMap[dataType.jdbcTypeNumber] = dataType;
        return;
    };

    this.getColumnType = function(name) {
        return typeNameMap[name];
    };

    this.getColumnTypeByJdbcNumber = function(number) {
        return jdbcTypeNumberMap[number];
    };
    
    return this;
};

/**
 * Returns the storage engine type. This is only needed for MySQL databases
 * @returns The storage engine type
 * @type String
 */
BaseDialect.prototype.getEngineType = function() {
    return null;
};

/**
 * Returns the string passed as argument enclosed in quotes
 * @param {String} str The string to enclose in quotes
 * @returns The string enclosed in quotes
 * @type String
 */
BaseDialect.prototype.quote = function(str) {
    return this.openQuote + str + this.closeQuote;
};

/** @ignore */
BaseDialect.prototype.toString = function() {
    return "[Dialect " + this.name + "]";
};

/**
 * Returns true if the underlying database supports sequences. Dialect
 * implementations should override this.
 * @returns True if the database supports sequences, false otherwise
 * @type Boolean
 */
BaseDialect.prototype.hasSequenceSupport = function() {
    return false;
};

/**
 * Returns the SQL statement for retrieving the next value of a sequence. Dialect
 * implementations should override this.
 * @param {String} sequenceName The name of the sequence
 * @returns The SQL statement
 * @type String
 */
BaseDialect.prototype.getSqlNextSequenceValue = function(sequenceName) {
    return "";
};
