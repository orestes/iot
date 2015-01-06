const int MIN  = 0;
const int MAX = 255;

int led = 9;
int brightness = 0;
int delta = 2;

void setup() {
  pinMode(led, OUTPUT); 
 //Initialize serial and wait for port to open:
  Serial.begin(9600); 
}

void loop() {
  analogWrite(led, brightness);
  brightness += delta;

  // Flip the sign of the delta to fade in the oposite way
  // Using < and > to prevent delta overflows
  if (brightness <= MIN || brightness >= MAX) {
    // Flip fade direction
    delta = -delta;  
    // Correct the value
    brightness += delta;
  }
  
  delay(30);  
}
