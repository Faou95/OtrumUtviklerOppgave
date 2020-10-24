package com.example.demo;

public class Person {
    // en statisk integer som itererer for hver person objekt (brukes for ID)
    private static int count = 0;
    int id;
    String navn;
    int alder;

    public Person(String navn, int alder){
        // itererer og setter id
        id = ++count;
        this.navn = navn;
        this.alder = alder;
    }

    public int getId() {
        return id;
    }
    public String getNavn() {
        return navn;
    }

    public int getAlder() {
        return alder;
    }
}
