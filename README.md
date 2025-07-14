# gt-modding-hub

This is the public repository behind the GT Modding Hub.

Dependencies are mkdocs-material among other extensions.


## Setup

Python 3 is required.
```
pip install mkdocs-material mkdocs-git-committers-plugin-2 mkdocs-table-reader-plugin mkdocs-git-revision-date-localized-plugin mkdocs-glightbox "mkdocs-material[imaging]" mkdocs-table-reader-plugin
```

Cairo (Windows) - Download [MSYS2](https://www.msys2.org/) and run:
```
pacman -S mingw-w64-ucrt-x86_64-cairo
```

Local host the site:
```
mkdocs serve
```

