# Configure GitHub Backups Path

This configures the path we will prefix to each file when  backing up your files to GitHub. 
It's required for the **Backup All My Files to GitHub** script.

For example, if you set this to <i>backups/sekrit</i>, a public file named <i>Blackjack.opml</i> 
would be saved to the path <i>backups/sekrit/publicFiles/Blackjack.opml</i>

You can include or omit starting and trailing slashes.

<i>Important:</i> This script cannot tell, and will not warn you, if you upload private files to a public repository.



### To use this
- Select <b>Configure GitHub Backups Path</b> from your scripts menu.
- We will display a dialog box where you can view and edit the current value.
  
### To install this

#### Open the latest version of this Drumkit in Drummer
- <b>File → Open URL...</b>
- https://raw.githubusercontent.com/PostMonsterG/drumkit-samples/main/ConfigureGitHubBackupsPath/ConfigureGitHubBackupsPath.opml 

#### Add this Drumkit to your scripts menu in Drummer
- Select the entire outline, i.e., the **Configure GitHub Backups Path** node that contains everything
- Copy it (⌘C)
- <b>File → Special Files... → Scripts menu... </b>
- Paste the outline (⌘V)
- There should be a new **Configure GitHub Backups Path** entry in your scripts menu.
