# Visual Conceptual Metaphor Explorer 
This tool allows the exploration of deconstructed infographics and categorized visual and conceptual metaphors in support of our work, *The Language of Infographics: Toward Understanding Conceptual Metaphor Use in Scientific Storytelling* (currently under review to IEEE VIS 2024).  

This tool can be viewed online by following this link: https://lauragarrison87.github.io/metaphorTool/exploratoryTool/

Its corresponding GitHub repository location is: https://github.com/lauragarrison87/metaphorTool

## Getting started 
1. `cd metaphorTool/exploratoryTool`
2. Start a local server. We tested with and recommend using Python Simple Server, which you can run in your terminal `python3 -m http.server --bind 127.0.0.1` (Mac/Linux) or `py -m http.server --bind 127.0.0.1` (Windows)
3. With your local server running, load the page at the following link address in your web browser of choice (we have tested on Chrome, Firefox, and Safari): [http://127.0.0.1:8000/](http://127.0.0.1:8000/). This will load in the explorer initialized with the infographics from the biomedical domain.


## Using the Visual Conceptual Metaphor Explorer
Use the top navigation menu (Biomedicine, Climate, Space, Anthropology) to explore within the different classified scientific domains. 

A spatiotemporal graph is placed on the left side (Infographic Spatio-Temporal Distribution section) and displays points that represent individual infographics (x axis= temporal coverage of infographic, y axis= spatial coverage of infographic). Some infographics (in biomedical, climate, space, and anthropology domains) span across several spatial scales, which are represented by beveled rectangles. Please note that the middle and right section will remain empty until a point (infographic) is chosen by hovering above it. 

Once a desired infographic is chosen by hovering over a point in the spatio-temporal distribution plot, Image Details section will appear in the middle including the embedded infographic, with image name, image author(s), and the domain(s) to which the infographic belongs. A source URL link appears below the infographics image. Due to copyright reasons, some infographics could not be embedded. Please follow the URL link provided to reach the original source location for the infographic. 

On the right side of the interface (Conceptual Metaphor Analysis section), the chosen infographic is visually analyzed with a bar chart showing the number of visual conceptual metaphors used. The text below identifies describes the different types of metaphors identified in the infographic, including whether a textual metaphor is present and what type. 

To reproduce the sample image below, navigate to navigation menu at the top of the page and chose the 'Biomedicine' category. Navigate to the scatter plot on the left and hover over a plotpoint at the bottom of the distribution plot located between the 'day' and 'week' on the temporal (x) axis, and 'molecules' on the spatal (y) axis. Once you reach the point, the middle part revelas the image of the infographycs and its details and the right side displays the incidence and analysis of individual visual metaphors.

<img width="1143" alt="Stamp_IMG_Github" src="https://github.com/user-attachments/assets/16587105-6785-4239-bbe3-c1e36329decf">



