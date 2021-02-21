#include <wiringPi.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <signal.h>
#include <softTone.h>
#include "iotmakers.h"

#define LED1 5 // BCM_GPIO 24
#define TC1 4  // BCM_GPIO 23
#define MAXTIMINGS 85
#define DHTPIN 7
#define	BUZZER 1
#define RED 3

int dht11_dat[5] = {0, 0, 0, 0};
int scale[2] = {1318, 1046};

static int local_loop = (0);

static void SigHandler(int sig)
{
	switch(sig)
	{
		case SIGTERM :
		case SIGINT :
			printf("accept signal SIGINT[%d]\n", sig);
			im_stop_service();
			local_loop = (0);
			break;
		default :
			;
	};
	return;
} 
static void set_SigHandler()
{
	signal(SIGINT,   SigHandler);	
	signal(SIGTERM,  SigHandler);	
}

/* ============================
main_sample1.c
- Receiving the control data
	mycb_numdata_handler();
	mycb_strdata_handler();
============================ */
static void mycb_numdata_handler(char *tagid, double numval)
{
	// !!! USER CODE HERE
	printf("tagid=[%s], val=[%f]\n", tagid, numval);
}

static void mycb_strdata_handler(char *tagid, char *strval)
{
	// !!! USER CODE HERE
//	printf("tagid=[%s], val=[%s]\n", tagid, strval);
	int i;
	// LED on-off 
	pinMode(LED1, OUTPUT);
	if(!strcmp(tagid,"LED"))
	{
		if(!strcmp(strval,"ON"))
		{
			printf("tagid=[%s], val=[%s]\n", tagid, strval);
			digitalWrite(LED1, 1); // On
		}
		else if(!strcmp(strval,"OFF"))
		{
			printf("tagid=[%s], val=[%s]\n", tagid, strval);
		    digitalWrite(LED1, 0); // Off
		}
	}else if(!strcmp(tagid, "BUZZER")){
		if(!strcmp(strval, "ON")){
			softToneCreate(BUZZER);
			
			for(i = 0; i < 6; i++){

				softToneWrite(BUZZER, scale[0]);
				delay(400);
				softToneWrite(BUZZER, scale[1]);
				delay(400);
			}
			softToneStop(BUZZER);
		}
	}
}

float get_moth(int adc){
	float data;

	if(adc > 1000){
		data = 0;
	}else{
		data = (1000 - adc)/ 10;
	}
	return data;
}

float get_co2(int adc){
	float data;
	float answer;

	data = ((1023/(float)adc) *5 - 1 * 10);
	data = data/76.63;
	answer = 116.6020682 * ((1 / data) * (1/data) * (1/data));
	if(answer > 15000){
		answer = 15000;
	}
	return answer;
}

float myAnalogRead(int spichannel, int config, int analogchannel){
	unsigned char buffer[3] = {1};
	buffer[1] = (config + analogchannel) << 4;
	wiringPiSPIDataRW(spichannel, buffer, 3);
	return ((buffer[1]&3) << 8) + buffer[2];
}


/* ============================
main_sample1.c
- Sending the collection data
	im_send_numdata();
	im_send_strdata();
============================ */
int main()
{
	int i;
	int rc;
	int red_count = 0;
	int isDetect = 0;
	
	int spi_channel = 0;
	int spi_speed = 10000000;
	int config = 8;
	int co2_channel = 0;
	int solid_channel = 2;
	int light_channel = 4;

	float adc_value;
	float moth_value;
	float light_value;


	double temps;
	double muth;
	int red = 0;
	int detected = 0;
	
	set_SigHandler();

	printf("im_init()\n");
	rc = im_init_with_config_file("./config.txt");
	if(rc < 0)	
	{
		printf("fail im_init()\n");
		return -1;
	}

	im_set_loglevel(LOG_LEVEL_DEBUG);
	im_set_numdata_handler(mycb_numdata_handler);
	im_set_strdata_handler(mycb_strdata_handler);

	printf("im_start_service()...\n");
	rc = im_start_service();
	if(rc < 0)	
	{
		printf("fail im_start_service()\n");
		im_release();
		return -1;
	}

    // Raspberry pi wiringPiSetup...
	printf("dht11 Raspberry pi\n");
	if(wiringPiSetup() == -1) exit(1); 
	if(wiringPiSPISetup(spi_channel, spi_speed) == -1) return -1;

	local_loop = (1);
	while(local_loop == (1)) 
	{
	 	//read read dht11 data /config setup...
		uint8_t laststate = HIGH;
		uint8_t counter = 0;
		uint8_t j = 0, i;
		float f;
		dht11_dat[0] = dht11_dat[1] = dht11_dat[2] = dht11_dat[3] = dht11_dat[4] = 0;

		// pull pin down for 18 millisecond... 
		pinMode(DHTPIN, OUTPUT);
		digitalWrite(DHTPIN, LOW);
		delay(18);
		digitalWrite(DHTPIN, HIGH);
		delayMicroseconds(40);
		pinMode(DHTPIN, INPUT);

		// detect change and read data...
		for(i = 0; i < MAXTIMINGS; i++) 
		{
			counter = 0;
			while(digitalRead(DHTPIN) == laststate) 
			{
				counter++;
				delayMicroseconds(1);
				if(counter == 255) break;
			}
			laststate = digitalRead(DHTPIN);
			if(counter == 255) break; // if while breaked by timer, break for...
			
			// ignore first 3 transitions 
			if((i >= 4) && (i % 2 == 0)) 
			{
				dht11_dat[j / 8] <<= 1;
				if (counter > 16) dht11_dat[j / 8] |= 1;
				j++;
			}
		}

		if((j >= 40) && (dht11_dat[4] == ((dht11_dat[0] + dht11_dat[1] + dht11_dat[2] + dht11_dat[3]) & 0xff)))
		{
			printf("Temp\nHumidity = %d.%d %% Temperature = %d.%d *C \n", dht11_dat[0], dht11_dat[1], dht11_dat[2], dht11_dat[3]);
  
	        double dData2 = (double)dht11_dat[2];
    	    double dData3 = (double)dht11_dat[3];
        	temps = dData2 + dData3;

			// send data to IoTMakers ...
			dData2 = (double) dht11_dat[0];
			dData3 = (double) dht11_dat[1];
			muth = dData2 + dData3;

		}
		

		// TC value send ...
//		pinMode(TC1, INPUT);
//		if(difitalRead(TC1) == 0)
//		{
//			printf("Not Detect !!\n");
//			im_send_numdata("Touch", 0, 0);  
//		}
//		else
//		{
//			printf("Detected !!\n");
//			im_send_numdata("Touch", 1, 0);  
//		}
//
		pinMode(RED, INPUT); 
                if(digitalRead(RED)==0)
                {
//                      printf("RED light Not Detect !!\n");
			red_count = 0;
			red = 0;
			if(isDetect){
				isDetect = 0;
				im_send_numdata("DETECT", isDetect, 0);
			}  
                }
                else
                {
                        printf("RED light Detected !!\n");
                        red = 1;
			red_count++;
			if(red_count >= 5 && !isDetect){
				printf("Check please!!\n");
				isDetect = 1;
				im_send_numdata("DETECT", isDetect, 0);
			}
                }


		adc_value = myAnalogRead(spi_channel, config, co2_channel);
		printf("CO2\nCO2 : %fppm\n", get_co2(adc_value));

		moth_value = myAnalogRead(spi_channel, config, solid_channel);
		printf("Solid Humi\nSolid Humi: %f\%\n", get_moth(moth_value));
		//printf("real Solid Humi: %d\n", (int)moth_value);
		light_value = myAnalogRead(spi_channel, config, light_channel);
		printf("Light\nLight: %flux\n", light_value);

		im_send_numdata("Temp", temps, 0);
		im_send_numdata("Humi", muth, 0);
		im_send_numdata("RED", red, 0);

		im_send_numdata("CO2", (int)get_co2(adc_value), 0);
		//printf("%d %d\n", (int)get_co2(adc_value), get_co2(adc_value)); 
		im_send_numdata("Solid", get_moth(moth_value), 0);
		im_send_numdata("Light", light_value, 0);


		delay(1000);
	}
	printf("im_stop_service()\n");
	im_stop_service();

	printf("im_release()\n");
	im_release();

	return 0;
}
