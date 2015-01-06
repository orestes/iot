int led = 9;
int brightness = 0;
int delta = 5;

void setup() {
  pinMode(led, OUTPUT);  
}

void loop() {
  analogWrite(led, brightness);
  
  if (brightness == 0) {
    brightness = 255;
  } else {
      brightness -= delta;
  }
  
  delay(30);  
}
