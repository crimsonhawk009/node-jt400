'use strict';
// Error codes are similar to nodejs's error codes
// https://nodejs.org/api/errors.html#nodejs-error-codes
// Exception List pulled from
// https://docs.oracle.com/javase/7/docs/api/java/sql/package-summary.html
// And here
// https://javadoc.midrange.com/jtopen/index.html?com/ibm/as400/access/AS400JDBCSQLSyntaxErrorException.html
const errorList = [
	{
		exception: 'com.ibm.as400.access.AS400Exception',
		code: 'AS400_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.AS400JDBCSQLSyntaxErrorException',
		code: 'AS400_JDBC_SQL_SYNTAX_ERROR_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.AS400SecurityException',
		code: 'AS400_SECURITY_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ConnectionDroppedException',
		code: 'CONNECTION_DROPPED_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ConnectionPoolException',
		code: 'CONNECTION_POOL_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ErrnoException',
		code: 'ERRNO_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ErrorCompletingRequestException',
		code: 'ERROR_COMPLETING_REQUEST_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ExtendedIllegalArgumentException',
		code: 'EXTENDED_ILLEGAL_ARGUMENT_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ExtendedIllegalStateException',
		code: 'EXTENDED_ILLEGAL_STATE_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ExtendedIOException',
		code: 'EXTENDED_IO_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.IllegalObjectTypeException',
		code: 'ILLEGAL_OBJECT_TYPE_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.IllegalPathNameException',
		code: 'ILLEGAL_PATH_NAME_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.InternalErrorException',
		code: 'INTERNAL_ERROR_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.LicenseException',
		code: 'LICENSE_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.NativeErrorCode0100Exception',
		code: 'NATIVE_ERROR_CODE_0100_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ObjectAlreadyExistsException',
		code: 'OBJECT_ALREADY_EXISTS_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ObjectDoesNotExistException',
		code: 'OBJECT_DOES_NOT_EXIST_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.PersistenceException',
		code: 'PERSISTENCE_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ProxyException',
		code: 'PROXY_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.RequestNotSupportedException',
		code: 'REQUEST_NOT_SUPPORTED_EXCEPTION',
	},
	{
		exception: 'com.ibm.as400.access.ServerStartupException',
		code: 'SERVER_STARTUP_EXCEPTION',
	},
	{
		exception: 'java.sql.BatchUpdateException',
		code: 'BATCH_UPDATE_EXCEPTION',
	},
	{
		exception: 'java.sql.DataTruncation',
		code: 'DATA_TRUNCATION',
	},
	{
		exception: 'java.sql.SQLClientInfoException',
		code: 'SQL_CLIENT_INFO_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLDataException',
		code: 'SQL_DATA_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLException',
		code: 'SQL_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLFeatureNotSupportedException',
		code: 'SQL_FEATURE_NOT_SUPPORTED_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLIntegrityConstraintViolationException',
		code: 'SQL_INTEGRITY_CONSTRAINT_VIOLATION_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLInvalidAuthorizationSpecException',
		code: 'SQL_INVALID_AUTHORIZATION_SPEC_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLNonTransientConnectionException',
		code: 'SQL_NON_TRANSIENT_CONNECTION_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLNonTransientException',
		code: 'SQL_NON_TRANSIENT_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLRecoverableException',
		code: 'SQL_RECOVERABLE_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLSyntaxErrorException',
		code: 'SQL_SYNTAX_ERROR_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLTimeoutException',
		code: 'SQL_TIMEOUT_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLTransactionRollbackException',
		code: 'SQL_TRANSACTION_ROLLBACK_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLTransientConnectionException',
		code: 'SQL_TRANSIENT_CONNECTION_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLTransientException',
		code: 'SQL_TRANSIENT_EXCEPTION',
	},
	{
		exception: 'java.sql.SQLWarning',
		code: 'SQL_WARNING',
	},
];

interface error {
	exception: String,
	code: String
}

const getErrorCode = (cause: String): error => {
	let error: error = {
		exception: cause,
		code: 'UNCAUGHT_EXCEPTION',
	};
	for (let err in errorList) {
		if (cause.indexOf(errorList[err].exception) >= 0) {
			error = errorList[err];
			break;
		}
	}
	return error;
};

export function jt400Error(err) {
	Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
	// use node-java err object to narrow down cause of error and parse it for
	// known exceptions
	const cause = err.cause.toString();
	const error = getErrorCode(cause);
	this.code = error.code;
	this.name = error.exception;
	this.message = cause;
	this.verbose = err;
}