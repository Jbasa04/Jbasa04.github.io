#ifndef GFX_H
#define GFX_H

#include <X11/Xlib.h>

void gfx_open( int width, int height, const char *title );

void gfx_flush();

void gfx_color( int red, int green, int blue );

void gfx_clear();

void gfx_clear_color( int red, int green, int blue );

int gfx_event_waiting();

char gfx_wait();

int gfx_xpos();
int gfx_ypos();

int gfx_xsize();
int gfx_ysize();

void gfx_point( int x, int y );

void gfx_line( int x1, int y1, int x2, int y2 );

void gfx_circle( int xc, int yc, int r );

void gfx_text( int x, int y , const char *text );


#endif
