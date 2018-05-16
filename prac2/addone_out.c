#include <stdio.h>
#include <stdlib.h>

int main( int ac , char *av[] ){
	char	line[100];
	fgets( line, 100, stdin); 
	FILE	*fp=fopen( "testout.txt" , "w" );
	int num=atoi(line);
	if  (fp!= NULL )
	{
		fprintf(fp, "%d\n", num+1);
		fclose( fp );
	}
	else if(fp == NULL){
		printf("Error opening file!\n");
		exit(1);
	}
}
