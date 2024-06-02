/**
 * The version of the application
 * 
 */
const AppVersion: React.FC = () => {

  const getVersion = () => {
    //WARNING: Ensure that the version value is the same as that "version" value in package.json
    const version = '2.1.0'; //HACK: temporary solution but does not follow best practices
    return version;
  }

  return (
    <div>
       <p style={{ fontSize: "11px", color: "grey" }}>Daro Portfolio Tree, Version: {getVersion()}</p>
    </div>
  );
};

export default AppVersion
