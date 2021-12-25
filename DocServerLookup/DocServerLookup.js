This Drumkit makes it easier to look up verbs in DocServer. 
Created by Gary Teter
This is the eighth version.

<b>To use this</b>
    Select some text, and click the icon.
    Any documentation we find will be inserted beneath the current node.
<b>To install this</b>
    <b>Open the latest version of this Drumkit in Drummer</b>
        <b>File → Open URL...</b>
         https://raw.githubusercontent.com/PostMonsterG/drumkit-minutes/main/DocServerLookup.opml 
    <b>Add this Drumkit to your iconbar in Drummer</b>
        Select this entire outline, i.e., the above "Question" node that contains all this
        Copy it (⌘C)
        <b>File → Special Files... → Iconbar... </b>
        Paste this outline (⌘V)
        There should be a new question mark in your icon bar
//    <b>Here is the code</b>
    const selection    = GetSelectedText() 
    const cleaned       = CleanText( selection ) 
    const verb             = ExtractDrumkitVerb( cleaned )
    const found          = InsertDrumkitVerbDocs( verb ) 
    if ( !found ) { speaker.beep() }
    
    //    <b>Functions</b>
        //    <b>Get the selected text</b>
            function GetSelectedText() {
                <b>Description</b>
                    We attempt to get the current selection. If we can't, we get the text of the current node. 
                    
                    <i>Params</i>
                        None
                    <i>Input</i>
                        The currently selected text
                        The current node
                    <i>Returns</i>
                        A string containing the selected text
                        This method will return an empty string rather than undefined
                
                var term = op.getSelectedText()
                if ( term == "" ) { 
                     term = op.getLineText()
                    }
                return term
                }
                
        //    <b>Clean up the selection</b>
            function CleanText( term ) {
                <b>Description</b>
                    We strip markup, convert punctuation—except periods—to spaces, collapse space runs, and trim white space. 
                    
                    <i>Params</i>
                        <b>term</b> is the string to be cleaned
                    <i>Returns</i>
                        Cleaned version of the string
                        This method will return an empty string rather than undefined
                
                if (term != "") {
                    term = string.stripMarkup( term ) 
                    term = string.multipleReplaceAll( term, { 
                        "("    :     " ",
                        ")"    :     " ",
                        ";"    :     " ",
                        "{"    :     " ",
                        "}"    :     " ",
                        "+"   :     " ",
                        "-"    :     " ",
                        "?"    :     " ",
                        "/"    :     " ",
                        "\""  :     " ",
                        "="   :     " ",
                        })
                    term = string.multipleReplaceAll( term, {
                        "   "  :  " ",
                        "  "   :  " ",
                        })
                    term = string.trimWhitespace( term )
                    }
                return term
                }
                
        //    <b>Extract a Drumkit verb</b>
            function ExtractDrumkitVerb( term ) { 
                <b>Description</b>
                    If the provided term contains a Drumkit verb, we'll return it. Otherwise, we'll return undefined. 
                    
                    <i>Params</i>
                        <b>term</b> is the string to be validated
                    <i>Returns</i>
                        <b>term</b>, if it is a valid Drumkit verb, or undefined if it isn't
                
                if ( term === undefined ) { return term }
                const num_fields = string.countFields( term, "  " )
                const categories = GetDrumkitVerbDocs().opml.body.subs
                for ( let i = num_fields; i > 0; i-- ) {
                    const searchterm = string.lower( string.nthField( term, " ", i ) )
                    for ( const category of categories ) {
                        for ( const verb of category.subs ) {
                            if ( string.lower( verb.text ) == searchterm ) {
                                return verb.text
                                }
                            }
                        }
                    }
                return undefined
                }
                
        //    <b>Insert the Drumkit verb docs</b>
            function InsertDrumkitVerbDocs( searchterm ) { 
                <b>Description</b>
                    If we can find the documentation for the provided term, it will be inserted below the current node. 
                    
                    <i>Params</i>
                        <b>searchterm</b> is the verb to be looked up
                    <i>Modifies</i>
                        Inserts a child node beneath the current outline node
                    <i>Returns</i>
                        <b>true</b> if we found documentation and inserted it
                
                if ( searchterm === undefined ) { return searchterm }
                
                const searchcat = string.nthField( searchterm, ".", 1 ) + " verbs"
                for ( const category of GetDrumkitVerbDocs().opml.body.subs ) {
                    if ( category.text == searchcat ) {
                        for ( const verb of category.subs ) {
                            if ( verb.text == searchterm ) {
                                OpInsertExtractedOpmlSection( verb, right, 0 )
                                return true
                                }
                            }
                        }
                    }
                return false
                }
                
        //    <b>Get the Drumkit verb docs from DocServer </b>
            function GetDrumkitVerbDocs() {
                <b>Description</b>
                    We fetch <b>verbDocs.opml</b>, the opml file that DocServer uses, and parse it into a JavaScript object. 
                    Then we cache that under <b>T.drumkit.verbDocs</b>, and return it.
                    
                    <i>Params</i>
                        None
                    <i>Input</i>
                        http://drummer.scripting.com/davewiner/verbDocs.opml
                    <i>Modifies</i>
                        <b>T.drumkit.verbDocs</b>
                    <i>Returns</i>
                        The verbDocs as a JavaScript object
                        This method returns an empty object rather than undefined
                
                const T = Garytown()
                
                if (T.drumkit == undefined) { T.drumkit = new Object() }
                if (T.drumkit.verbDocs == undefined) {
                    const url                       = "http://drummer.scripting.com/davewiner/verbDocs.opml"
                    const docs                   = FetchOpmlWithIncludes( url )
                    T.drumkit.verbDocs = docs
                    }
                return T.drumkit.verbDocs
                }
        //    <b>Insert an extracted section of OPML</b>
            function OpInsertExtractedOpmlSection( node, direction, level ) {
                <b>Description</b>
                    This method inserts nodes from a JavaScript Opml outline into the current outline.
                    This can be useful for working with things like DocServer files.
                    Every node inserted will be marked as a comment. 
                    See below for details about other special handling for inserted nodes.
                    
                    <i>Params</i>
                        <b>node</b> is the JavaScript object for the Opml to be inserted
                        <b>direction</b> is either <b>right</b>, or <b>down</b>
                        <b>level</b> is an integer representing the current nesting
                            Text for nodes with level 0 will be wrapped in HTML bold tags
                            Text for nodes with level 1 will be wrapped in HTML italics tags
                            Nodes at levels greater than 1, which have subnodes, will be automatically collapsed
                    <i>Modifies</i>
                        Inserts child or sibling nodes at the current node
                    <i>Returns</i>
                        undefined
                    <i>See also</i>
                        opml.parse()
                    <i>Note</i>
                        By itself, opml.parse() reverses the order of the nodes. If you want to preserve the ordering in the original file, you should reverse them before using this method.
                
                var label = node.text
                
                //   <i>Insert the node, add formatting, and mark it as a comment</i>
                    if ( level == 0 ) { label = "<b>" + node.text + "</b>" }
                    if ( level == 1) { label = "<i>" + node.text + "</i>" }
                    op.insert( label, direction )
                    I don't know why the op.bold and op.italic verbs aren't working for me but I sure wish they would
                    if ( level == 0 ) { op.bold() }
                     if (level == 1) { op.italic() }
                    op.makeComment()
                
                var newdirection = right
                for ( const sub of node.subs ) {
                    if ( sub.subs != undefined ) {
                        const cursor = op.getCursor()
                        OpInsertExtractedOpmlSection( sub, right, level + 1 )
                        op.setCursor( cursor )
                        if ( level > 1 ) {
                            op.collapse()
                            }
                        }
                    else {
                        op.insert(sub.text, newdirection )
                        op.makeComment()
                        newdirection = down
                        }
                    }
                
                }
        //    <b>Fetch and parse OPML, fetching included OPML</b>
            function FetchOpmlWithIncludes( url ) {
                <b>Description</b>
                    Fetches and parses the OPML at url, resolving includes  for top-level subs
                    
                    <i>Params</i>
                        <b>url</b> is the location of the OPML to be fetched and parsed
                    <i>Returns</i>
                        The fetched OPML as a JavaScript object
                        This method returns an empty object rather than undefined
                
                const fetched        = http.readUrl( url )
                const parsed          = opml.parse( fetched )
                
                for ( const sub of parsed.opml.body.subs ) {
                    if ( sub.type == "include" ) {
                        sub.subs = opml.parse( http.readUrl( sub.url ) ).opml.body.subs
                        }
                    }
                return parsed
                }
        //    <b>Establish Garytown, a place to put things</b>
            function Garytown() {
                <b>Description</b>
                    Returns a reference to a temporary place to put things.
                    
                    <i>Params</i>
                        none
                    <i>Modifies</i>
                        <b>root.temp.garytown</b>
                    <i>Returns</i>
                        <b>root.temp.garytown</b>
                    
                    <i>Discussion</i>
                        Drummer uses <b>root</b> as a place to permanently store things. You can't write to <b>root</b>, but you can create an object called <b>root.temp</b>, and you can write there. This is a temporary place, it gets reset when Drummer restarts.
                        To avoid collisions with anybody else's scripts, I am carving out a part of <b>root.temp</b> and calling it <b>Garytown</b>.
                        The convention is, at the beginning of your method, get a reference to <b>Garytown</b>, call it <b>T</b>, and put things there.
                
                if ( root.temp == undefined )                     { root.temp = new Object() }
                if ( root.temp.garytown == undefined ) { root.temp.garytown = new Object() }
                return root.temp.garytown
                }
