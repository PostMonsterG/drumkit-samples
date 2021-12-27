# SaveFileToGitHub

This Drumkit saves the currently open document to GitHub.
We look for header elements in the OPML to determine where to save the file and how it is processed. 

- <b>rd-repository</b>
Set this to the name of the GitHub repository you want to save the file into.
For example, "hello-world"

- <b>rd-path</b>
Set this to the path to the file, including the filename. For example, "directory/sub/file.opml"

- <b>rd-type</b>
Controls how the file is processed before uploading

  - <b>opml</b>
  The OPML file will be uploaded without processing

  - <b>text</b>
  Suitable for Markdown, the text from the nodes of the outline will be included, but none of the indentation or OPML attributes

  - <b>indented</b>
  Suitable for JavaScript, the text from the nodes of the outline will be included, with indentation per OPML indentation level

### To install this
You will also need to install the **Configure GitHub User Name** Drumkit sample.

#### Open the latest version of this Drumkit in Drummer
- <b>File → Open URL...</b>
- https://raw.githubusercontent.com/PostMonsterG/drumkit-samples/main/SaveFileToGitHub.opml 

#### Add this Drumkit to your scripts menu in Drummer
- Select the entire outline, i.e., the **Save File to GitHub** node that contains everything
- Copy it (⌘C)
- <b>File → Special Files... → Scripts menu... </b>
- Paste the outline (⌘V)
- There should be a new **Save File to GitHub** entry in your scripts menu.
