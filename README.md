# Visual Conceptual Metaphor Explorer 
This tool allows the exploration of deconstructed infographics and categorized visual and conceptual metaphors in support of our submission ... 


## Getting started 
1. `cd metaphorTool/exploratoryTool`
2. Start a local server. We tested with and recommend using Python Simple Server, which you can run in your terminal `python3 -m http.server --bind 127.0.0.1` (Mac/Linux) or `py -m http.server --bind 127.0.0.1` (Windows)
3. With your local server running, load the page at the following link address in your web browser of choice (we have tested on Chrome, Firefox, and Safari): [http://127.0.0.1:8000/BIOMED/](http://127.0.0.1:8000/BIOMED/). This will load in the explorer initialized with the infographics from the biomedical domain.


## Using the Visual Conceptual Metaphor Explorer
Use buttons (Biomedicine, Climate, Space, Anthropology) to explore within the different classified scientific domains. 

A spatiotemporal graph is placed on the left side and displays points that represent individual infographics (x axis= temporal coverage of infographic, y axis= spatial coverage of infographic). Some infographics (in biomedical, space, and anthropology domains) span across several spatial scales, which are represented by beveled rectangles. Please note that the middle and right section will remain empty until a point (infographic) is chosen. Above the graph, Primary domain is stated once a point is selected (alongside the Secondary domain(s), if applicable).

Once a desired point (infographic) is clicked, general information section will appear in the middle including the embedded infographic, name of the infographic, author(s), and the source URL link. Due to copyright reasons, some infographics could not be embedded. Please follow the URL link provided  to reach the original source site. 

On the right side (metaphor analysis section) the chosen infographics is visually analyzed with piechart which shows the visual cocneptual metaphors used. The boolean statement below states whether a textual conceptual metaphor that supports the graphical metaphors is present. If yes, the type is stated below.  



