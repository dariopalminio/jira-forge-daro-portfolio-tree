/**
 * The version of the application
 * 
 */
const AppVersion = () => {

  const getVersion = () => {
    //WARNING: Ensure that the version value is the same as that "version" value in package.json
    const version = '2.0.1'; //HACK: temporary solution but does not follow best practices
    return version;
  }

  return (
    <div>
      <p>Daro Portfolio Tree, Version: {getVersion()}</p>
    </div>
  );
};

export default AppVersion