#include <stdio.h>
#include <stdlib.h>

int main( int ac , char *av[] ){
	FILE	*fp;
	if ( (fp = fopen( "testin.txt" , "r" )) != NULL )
	{
		char	line[100];
		fgets( line, 100, fp);	/* more input	*/
		int num=atoi(line);
		num++;
		printf("%d",num);
		fclose( fp );
	}
	else
		exit(1);
}
