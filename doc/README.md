
# Custom UI Example

This is a Jira Forge sample application (Custom UI) that can be used as a base to start a new project.
Custom UI for more flexibility with developer-defined JavaScript, CSS, and HTML in a secured iframe hosted by Atlassian. In this case the stack is React 16 and Typescript.

Reference: 
https://developer.atlassian.com/cloud/jira/platform/forge/
https://developer.atlassian.com/platform/forge/custom-ui/
https://atlaskit.atlassian.com/
Scopes: https://developer.atlassian.com/cloud/jira/platform/scopes-for-oauth-2-3LO-and-forge-apps/
API: https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-filters/#api-rest-api-2-filter-search-get

See [developer.atlassian.com/platform/forge/](https://developer.atlassian.com/platform/forge) for documentation and tutorials explaining Forge.

Distribute: https://developer.atlassian.com/platform/forge/distribute-your-apps/
Listing Forge App: https://developer.atlassian.com/platform/marketplace/listing-forge-apps/
Create your Marketplace listing: https://developer.atlassian.com/platform/marketplace/creating-a-marketplace-listing/

Primeros pasos en Forge: Cómo desarrollar Apps en Atlassian Cloud (Parte 1: App para Jira) https://www.enmilocalfunciona.io/primeros-pasos-en-forge-plataforma-para-desarrollos-en-atlassian-cloud/


# Architecture

Forge makes it possible to build a fully-functional app, with hosting, multiple development environments, and API authentication built-in. Forge can be used to build custom apps and integrations or apps distributed through the Atlassian Marketplace. With the built-in Storage API, Jira API, FaaS and triggers, one can operate apps with virtually no owned infrastructure – which also makes the entire operation model not only incredibly cheap but also much more secure.

![Forge-App-General-Architectura.png](doc/img/Forge-App-General-Architectura.png)


![Forge-App-CustomUI-Architecture.png](doc/img/Forge-App-CustomUI-Architecture.png)


## Requirements

See [Set up Forge](https://developer.atlassian.com/platform/forge/set-up-forge/) for instructions to get set up.

## Quick start
- Install dependencies (inside of the `static/app` directory)::
```
npm install
```

- Modify your app by editing the files in `static/app/src/`.

- Build your app (inside of the `static/app` directory):
```
npm run build
```

- Deploy your app by running:
```
forge deploy
```

- Install your app in an Atlassian site by running:
```
forge install
```
### Create Forge App Notes steps
forge login
? Enter your email:
? Enter your Atlassian API token:
forge create
? Enter a name for your app: daro-portfolio-tree
? Select a category: Custom UI
? Select a template: jira-global-page

### Deploy to Dev Forge App Notes steps
cd .\static\app\  
\jira-forge-upstream-portfolio\static\app> npm run buildToDev
npm start
\jira-forge-upstream-portfolio\static\app> npm run buildToProd
\jira-forge-upstream-portfolio> forge login
? Enter your email:
? Enter your Atlassian API token:
\jira-forge-upstream-portfolio> forge deploy
\jira-forge-upstream-portfolio> forge install
\jira-forge-upstream-portfolio> forge install --upgrade 

### Notes
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.

## Support

See [Get help](https://developer.atlassian.com/platform/forge/get-help/) for how to get help and provide feedback.