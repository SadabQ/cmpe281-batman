import greenfoot.*;  // (World, Actor, GreenfootImage, Greenfoot and MouseInfo)

/**
 * Write a description of class MyWorld here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class MyWorld extends World
{

    /**
     * Constructor for objects of class MyWorld.
     * 
     */
    public MyWorld()
    {    
        // Create a new world with 600x400 cells with a cell size of 1x1 pixels.
        super(600, 400, 1); 
        Elep e = new Elep();
        addObject(e, 200,200);
        Grapes g = new Grapes();
        addObject(g, 400,200);
        //Ether eth = new Ether();
       // addObject(eth, 600, 400);
    }
} 
